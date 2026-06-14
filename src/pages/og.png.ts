import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import config from "@/config";
import fs from "node:fs/promises";
import path from "node:path";

export const GET: APIRoute = async context => {
  try {
    if (!config.features.dynamicOgImage) {
      throw new Error("Dynamic OG image generation is disabled in config");
    }

    const [regularData, boldData] = await Promise.all([
      fetch("https://cdn.jsdelivr.net/npm/@fontsource/merriweather@5.0.8/files/merriweather-latin-400-normal.woff").then(res =>
        res.arrayBuffer()
      ),
      fetch("https://cdn.jsdelivr.net/npm/@fontsource/merriweather@5.0.8/files/merriweather-latin-700-normal.woff").then(res =>
        res.arrayBuffer()
      ),
    ]);

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            background: "#fefbfb",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Merriweather",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  position: "absolute",
                  top: "-1px",
                  right: "-1px",
                  border: "4px solid #000",
                  background: "#ecebeb",
                  opacity: "0.9",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  margin: "2.5rem",
                  width: "88%",
                  height: "80%",
                },
              },
            },
            {
              type: "div",
              props: {
                style: {
                  border: "4px solid #000",
                  background: "#fefbfb",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem",
                  width: "88%",
                  height: "80%",
                },
                children: {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      margin: "20px",
                      width: "90%",
                      height: "90%",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "90%",
                            maxHeight: "90%",
                            overflow: "hidden",
                            textAlign: "center",
                          },
                          children: [
                            {
                              type: "p",
                              props: {
                                style: { fontSize: 72, fontWeight: "bold" },
                                children: config.site.title,
                              },
                            },
                            {
                              type: "p",
                              props: {
                                style: { fontSize: 28 },
                                children: config.site.description,
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            marginBottom: "8px",
                            fontSize: 28,
                          },
                          children: {
                            type: "span",
                            props: {
                              style: { overflow: "hidden", fontWeight: "bold" },
                              children: new URL(config.site.url).hostname,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        embedFont: true,
        fonts: [
          {
            name: "Merriweather",
            data: regularData,
            weight: 400,
            style: "normal",
          },
          {
            name: "Merriweather",
            data: boldData,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(new Uint8Array(pngBuffer), {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.warn("[OG Gen] Falling back to static default-og.jpg due to:", error);
    try {
      const fallbackImage = await fs.readFile(path.resolve("public/default-og.jpg"));
      return new Response(fallbackImage, {
        headers: { "Content-Type": "image/jpeg" },
      });
    } catch (fsError) {
      console.error("[OG Gen] Failed to load static fallback OG image:", fsError);
      return new Response("Error loading OG image", { status: 500 });
    }
  }
};
