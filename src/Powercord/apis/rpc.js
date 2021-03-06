/**
 * Powercord, a lightweight @discordapp client mod focused on simplicity and performance
 * Copyright (C) 2018-2020  aetheryx & Bowser65
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { API } = require('powercord/entities');

module.exports = class RPCAPI extends API {
  constructor () {
    super();

    this.scopes = {};
    this.events = {};
  }

  registerScope (scope, grant) {
    this.scopes[scope] = grant;
    this.emit('scopeAdded', scope);
  }

  registerEvent (name, properties) {
    this.events[name] = properties;
    this.emit('eventAdded', name);
  }

  unregisterScope (scope) {
    delete this.scopes[scope];
    this.emit('scopeRemoved', scope);
  }

  unregisterEvent (name) {
    delete this.events[name];
    this.emit('eventRemoved', name);
  }
};
