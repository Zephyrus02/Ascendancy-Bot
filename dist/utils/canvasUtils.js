"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWelcomeImage = createWelcomeImage;
const canvas_1 = __importDefault(require("canvas"));
async function createWelcomeImage(member, config) {
    const canvas = canvas_1.default.createCanvas(config.canvas.width, config.canvas.height);
    const context = canvas.getContext('2d');
    try {
        const background = await canvas_1.default.loadImage(config.canvas.background);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
    }
    catch (error) {
        context.fillStyle = '#36393f';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    // Add overlay
    context.fillStyle = 'rgba(0, 0, 0, 0.4)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw avatar
    const avatar = await canvas_1.default.loadImage(member.user.displayAvatarURL({ extension: 'png', size: 256 }));
    // Create circular avatar
    context.save();
    context.beginPath();
    context.arc(125, canvas.height / 2, 80, 0, Math.PI * 2);
    context.closePath();
    context.clip();
    context.drawImage(avatar, 45, canvas.height / 2 - 80, 160, 160);
    context.restore();
    // Add text
    context.font = '36px sans-serif';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    // Username
    context.fillText(member.user.username, canvas.width / 2 + 100, canvas.height / 2 - 20);
    // Welcome message
    context.font = '28px sans-serif';
    context.fillText(config.welcomeMessage, canvas.width / 2 + 100, canvas.height / 2 + 20);
    return canvas.toBuffer();
}
