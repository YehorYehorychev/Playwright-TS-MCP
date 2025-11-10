import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe("REST API Demo", () => {
  const baseURl = "https://reqres.in/api";

  test("Should GET the list of users", async ({ request }) => {
    // Make a GET call
    await log("info", `Making a GET call using ${baseURl}`);
    const response = await request.get(`${baseURl}/users?page=2`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    // Assert the status code
    expect(response.status()).toBe(200);
    await log("info", `The status code is ${response.status()}`);

    // Get list of the users
    const responseData = await response.json();
    await log(
      "info",
      `The response is: 
        ${JSON.stringify(responseData)}`
    );
  });
});
