import { oauth2Client } from './oauth2.js';
import { google } from 'googleapis';
import config from '../../config.js';

export async function sendMail(to, subject, message) {
    // 使用 oauth2.js 中統一管理的 oauth2Client
    // 它會自動處理 token 刷新

    const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const isHtml = /<[a-z][\s\S]*>/i.test(message);
    const contentType = isHtml 
        ? 'Content-Type: text/html; charset=UTF-8' 
        : 'Content-Type: text/plain; charset=UTF-8';

    const email = [
        `From: ${config.googleOauth.fromEmail}`,
        `To: ${to}`,
        `Subject: ${encodedSubject}`,
        contentType,
        '',
        message
    ].join('\n');

    const encodedMessage = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage,
        },
    });

    console.log("✅ 郵件寄出成功：", result.data.id);
    return { success: true, messageId: result.data.id };
}
