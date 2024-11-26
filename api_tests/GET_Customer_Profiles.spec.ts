import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';

let organizationGroupID:[] = [];
let customerProfileName: [] = [];

test.describe('Get CustomerProfiles using Organization Group ID', () => {
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

  test.describe('Get Customer Profile name using Organization Group ID', () => {
    test('Get CustomerProfile name - Based of auth @api', async ({
      request,
    }) => {
      const apiBaseURL = ENV.API_BASE_URL;
      const response = await request.get(`${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerprofiles`);
      const responseBody = JSON.parse(await response.text());
      expect.soft(response.ok()).toBeTruthy();
      expect.soft(response.status()).toBe(200);
      expect.soft(responseBody.items[0].data.name).toBeTruthy();
  
      //Collecting Regression Test Profile customerProfileName
      responseBody.items.forEach((x:any) => {
        if (x.data.name === 'Regression Test Profile') {
            customerProfileName.push(x.data.name);
        }
      });
    });

  test('Get Customer CustomerProfiles using ORG_GROUP_ID was collected from Get customers API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(
      `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/customerprofiles`);
    const responseBody = JSON.parse(await response.text());
    customerProfileName = responseBody.name;
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
  });
});

});