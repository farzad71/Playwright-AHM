import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';

let customerassessmentsID: string;
let organizationGroupID:[] = [];

test.describe('Get Customer Audit Report', () => {
  test('Get Organization Groups - Based of auth @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(`${apiBaseURL}/v2/organizationgroup`);
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
    expect.soft(responseBody.items[0].data.organizationGroupId).toBeTruthy();

    //Collecting default organization groupid
    responseBody.items.forEach((x:any) => {
      if (x.data.isDefault === true) {
        organizationGroupID.push(x.data.organizationGroupId);
      }
    });
  });

  test('GetCustomer Assessments to save the assessment ID using Organization groupID collected from  Get customers  API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(`${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerassessments`);
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
    expect.soft(responseBody.items[0].id).toBeTruthy();

    //Collecting customerassessmentsID for Regression Test Profile
    customerassessmentsID = responseBody.items[0].id

    
  });

  test('Get Customer Assessment Audit Report using customerassessmentsID collected from Get customers API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(
      `${apiBaseURL}/v2/customerassessments/${customerassessmentsID}/audit-report`);
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
  });

});