import { test, expect, request } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe("REST API Demo", () => {
  const baseURL = "https://reqres.in/api";

  test("Should GET the list of users", async ({ request }) => {
    // Make a GET call
    await log("info", `Making a GET call using ${baseURL}`);
    const response = await request.get(`${baseURL}/users?page=2`, {
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

  test("Should Create the user", async ({ request }) => {
    // Make a POST call
    await log("info", `Making a POST call using ${baseURL}`);

    const payload = {
      name: "Yehor Yehorychev",
      job: "SDET",
      id: "778",
      createdAt: "2025-11-10T23:17:13.986Z",
    };

    const response = await request.post(`${baseURL}/users`, {
      headers: {
        "x-api-key": "reqres-free-v1",
        "Content-Type": "application/json",
      },
      data: payload,
    });

    // Assert the status code
    expect(response.status()).toBe(201);
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
