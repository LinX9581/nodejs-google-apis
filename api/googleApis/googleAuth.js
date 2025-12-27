import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { BigQuery } from '@google-cloud/bigquery';
import config from '../../config.js';

const { clientEmail, privateKey } = config.google;

// Google Sheets API 的 Scopes
const SHEETS_SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];

// Google Analytics API 的 Scopes  
const ANALYTICS_SCOPES = [
    'https://www.googleapis.com/auth/analytics.readonly'
];

// BigQuery API 的 Scopes
const BIGQUERY_SCOPES = [
    'https://www.googleapis.com/auth/bigquery'
];

// 創建 JWT 認證實例 (用於 Google Sheets)
const createSheetsJWTAuth = () => {
    return new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: SHEETS_SCOPES,
    });
};

// 創建 JWT 認證實例 (用於 Google Analytics)
const createAnalyticsJWTAuth = () => {
    return new JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ANALYTICS_SCOPES,
    });
};

// 創建 JWT 認證實例 (用於 BigQuery)
const createBigQueryJWTAuth = () => {
    return new JWT({
        email: clientEmail,
        key: privateKey,
        scopes: BIGQUERY_SCOPES,
    });
};

// Google Sheets API 認證
export async function getGsAuth() {
    try {
        const auth = createSheetsJWTAuth();
        
        // 使用 async/await 進行認證
        await auth.authorize();
        
        const gsapi = google.sheets({ 
            version: 'v4', 
            auth 
        });
        
        return gsapi;
    } catch (error) {
        console.error('Google Sheets API 認證失敗:', error.message);
        throw new Error(`Google Sheets 認證錯誤: ${error.message}`);
    }
}

// Google Analytics API 認證
export function getGaAuth() {
    try {
        const gaAuthClient = createAnalyticsJWTAuth();
        
        const analyticsDataClient = new BetaAnalyticsDataClient({
            authClient: gaAuthClient
        });
        
        return analyticsDataClient;
    } catch (error) {
        console.error('Google Analytics API 認證失敗:', error.message);
        throw new Error(`Google Analytics 認證錯誤: ${error.message}`);
    }
}

// BigQuery API 認證
export function getBqAuth(projectId = 'nownews-analytics') {
    try {
        const bqAuthClient = createBigQueryJWTAuth();
        
        const bigquery = new BigQuery({
            projectId: projectId,
            authClient: bqAuthClient
        });
        
        return bigquery;
    } catch (error) {
        console.error('BigQuery API 認證失敗:', error.message);
        throw new Error(`BigQuery 認證錯誤: ${error.message}`);
    }
}

// 統一的認證工廠函數
export function createGoogleAuth(service, options = {}) {
    switch (service) {
        case 'sheets':
            return getGsAuth();
        case 'analytics':
            return getGaAuth();
        case 'bigquery':
            return getBqAuth(options.projectId);
        default:
            throw new Error(`不支援的服務類型: ${service}`);
    }
}
