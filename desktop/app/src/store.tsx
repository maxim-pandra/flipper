/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {createStore} from 'redux';
import reducers, {Actions, State as StoreState, Store} from './reducers/index';
import {stateSanitizer} from './utils/reduxDevToolsConfig';
import isProduction from './utils/isProduction';
import produce from 'immer';
import {
  defaultEnabledBackgroundPlugins,
  getPluginKey,
  isDevicePluginDefinition,
} from './utils/pluginUtils';
import Client from './Client';
import {
  DevicePluginDefinition,
  FlipperPlugin,
  PluginDefinition,
} from './plugin';
import {deconstructPluginKey} from './utils/clientUtils';
import {SandyPluginDefinition} from 'flipper-plugin';
import BaseDevice from './devices/BaseDevice';
import {State as PluginStates} from './reducers/pluginStates';

export const store: Store = createStore<StoreState, Actions, any, any>(
  rootReducer,
  // @ts-ignore Type definition mismatch
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
        // @ts-ignore: stateSanitizer is not part of type definition.
        stateSanitizer,
      })
    : undefined,
);

export function rootReducer(
  state: StoreState | undefined,
  action: Actions,
): StoreState {
  if (action.type === 'STAR_PLUGIN' && state) {
    const {plugin, selectedApp} = action.payload;
    const selectedPlugin = plugin.id;
    const clients = state.connections.clients.filter(
      (client) => client.query.app === selectedApp,
    );
    return produce(state, (draft) => {
      if (!draft.connections.userStarredPlugins[selectedApp]) {
        draft.connections.userStarredPlugins[selectedApp] = [];
      }
      const plugins = draft.connections.userStarredPlugins[selectedApp];
      const idx = plugins.indexOf(selectedPlugin);
      if (idx === -1) {
        plugins.push(selectedPlugin);
        // enabling a plugin on one device enables it on all...
        clients.forEach((client) => {
          startPlugin(client, plugin);
        });
      } else {
        plugins.splice(idx, 1);
        // enabling a plugin on one device disables it on all...
        clients.forEach((client) => {
          stopPlugin(client, plugin.id);
          const pluginKey = getPluginKey(
            client.id,
            {serial: client.query.device_id},
            plugin.id,
          );
          delete draft.pluginMessageQueue[pluginKey];
        });
      }
    });
  } else if (action.type === 'UPDATE_PLUGIN' && state) {
    const plugin = action.payload;
    if (isDevicePluginDefinition(plugin)) {
      return updateDevicePlugin(state, plugin);
    } else {
      return updateClientPlugin(state, plugin);
    }
  }

  // otherwise
  return reducers(state, action);
}

if (!isProduction()) {
  // For debugging purposes only
  // @ts-ignore
  window.flipperStore = store;
}

function stopPlugin(
  client: Client,
  pluginId: string,
  forceInitBackgroundPlugin: boolean = false,
): boolean {
  if (
    (forceInitBackgroundPlugin ||
      !defaultEnabledBackgroundPlugins.includes(pluginId)) &&
    client?.isBackgroundPlugin(pluginId)
  ) {
    client.deinitPlugin(pluginId);
  }
  // stop sandy plugins
  client.stopPluginIfNeeded(pluginId);
  return true;
}

function startPlugin(
  client: Client,
  plugin: PluginDefinition,
  forceInitBackgroundPlugin: boolean = false,
) {
  client.startPluginIfNeeded(plugin, true);
  // background plugin? connect it needed
  if (
    (forceInitBackgroundPlugin ||
      !defaultEnabledBackgroundPlugins.includes(plugin.id)) &&
    client?.isBackgroundPlugin(plugin.id)
  ) {
    client.initPlugin(plugin.id);
  }
}

function updateClientPlugin(state: StoreState, plugin: typeof FlipperPlugin) {
  const clients = state.connections.clients;
  return produce(state, (draft) => {
    const clientsWithEnabledPlugin = clients.filter((c) => {
      return (
        c.supportsPlugin(plugin.id) &&
        state.connections.userStarredPlugins[c.query.app]?.includes(plugin.id)
      );
    });
    // stop plugin for each client where it is enabled
    clientsWithEnabledPlugin.forEach((client) => {
      stopPlugin(client, plugin.id, true);
      delete draft.pluginMessageQueue[
        getPluginKey(client.id, {serial: client.query.device_id}, plugin.id)
      ];
    });
    cleanupPluginStates(draft.pluginStates, plugin.id);
    // update plugin definition
    draft.plugins.clientPlugins.set(plugin.id, plugin);
    // start plugin for each client
    clientsWithEnabledPlugin.forEach((client) => {
      startPlugin(client, plugin, true);
    });
  });
}

function updateDevicePlugin(state: StoreState, plugin: DevicePluginDefinition) {
  const devices = state.connections.devices;
  return produce(state, (draft) => {
    const devicesWithEnabledPlugin = devices.filter((d) =>
      supportsDevice(plugin, d),
    );
    devicesWithEnabledPlugin.forEach((d) => {
      d.unloadDevicePlugin(plugin.id);
    });
    cleanupPluginStates(draft.pluginStates, plugin.id);
    draft.plugins.devicePlugins.set(plugin.id, plugin);
    devicesWithEnabledPlugin.forEach((d) => {
      d.loadDevicePlugin(plugin);
    });
  });
}

function supportsDevice(plugin: DevicePluginDefinition, device: BaseDevice) {
  if (plugin instanceof SandyPluginDefinition) {
    return (
      plugin.isDevicePlugin &&
      plugin.asDevicePluginModule().supportsDevice(device as any)
    );
  } else {
    return plugin.supportsDevice(device);
  }
}

function cleanupPluginStates(pluginStates: PluginStates, pluginId: string) {
  Object.keys(pluginStates).forEach((pluginKey) => {
    const pluginKeyParts = deconstructPluginKey(pluginKey);
    if (pluginKeyParts.pluginName === pluginId) {
      delete pluginStates[pluginKey];
    }
  });
}
