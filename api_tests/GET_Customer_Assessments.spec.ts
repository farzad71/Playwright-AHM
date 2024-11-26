import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';

let customerassessmentsID: string;
let organizationGroupID:[] = [];

test.describe('Get Customer Assessment ID using Organization Group ID', () => {
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

  test('Get Customer Assessment ID using ORG_GROUP_ID was collected from Get customers API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(
      `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerassessments`);
    const responseBody = JSON.parse(await response.text());
    customerassessmentsID = responseBody.id;
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
  });

});