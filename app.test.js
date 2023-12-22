const request = require("supertest");
const express = require("express");
const app = require("./index"); // Asegúrate de exportar tu app en index.js

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200); // Esperamos un estado 200
  });
});

describe("Test Google auth route", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/auth/google");
    expect(response.statusCode).toBe(302); // Esperamos una redirección
  });
});

describe("Test profile route without session", () => {
  test("It should redirect to login", async () => {
    const response = await request(app).get("/profile");
    expect(response.statusCode).toBe(302); // Esperamos una redirección
    expect(response.headers.location).toBe("/login");
  });
});

// Aquí puedes agregar más pruebas para las otras rutas
