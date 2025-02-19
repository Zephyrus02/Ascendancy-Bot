"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReady = handleReady;
function handleReady(client) {
    console.log(`Logged in as ${client.user?.tag}`);
}
