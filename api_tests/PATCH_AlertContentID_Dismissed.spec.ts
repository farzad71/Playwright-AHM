import { test, expect } from '@playwright/test';
import ENV from '../utils/ENV';
import { AlertType } from '@app/models/alertType';


let organizationGroupID:[] = [];
let alertContentId: string;

test.describe('Patch dismissed AlertContent using Organization Group ID and alertcontentid', () => {
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

  test('Get Pending AlertContent using ORG_GROUP_ID was collected from Get customers API @api', async ({
    request,
  }) => {
    const apiBaseURL = ENV.API_BASE_URL;
    const response = await request.get(
      `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/alerts/pending`);

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(200);
    expect.soft(responseBody.items[0].data.alertContentId).toBeTruthy();

      //Collecting alertContentId
      alertContentId = responseBody.items[0].data.alertContentId
   
});

    test('Patch dismissed Alert using ORG_GROUP_ID and alertcontentID collected from Get customers API @api', async ({
        request,
      }) => {
        const apiBaseURL = ENV.API_BASE_URL;
        const response = await request.patch(
          `${apiBaseURL}/v2/organizationgroups/${organizationGroupID}/alerts/${alertContentId}/dismiss`);
      
        expect.soft(response.ok()).toBeTruthy();
        expect.soft(response.status()).toBe(200);
    
    });
 

});

