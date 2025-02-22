import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { configure } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";
import { afterEach, expect, vi } from "vitest";

expect.extend(matchers);

configure({ reactStrictMode: true });

afterEach(() => {
  cleanup();
});

// TextEncoder/TextDecoder polyfill
class MockTextEncoder {
  public encode(input: string): Uint8Array {
    return new Uint8Array(Buffer.from(input));
  }
}

class MockTextDecoder {
  public decode(input?: ArrayBufferView | ArrayBuffer | null): string {
    if (!input) {
      return "";
    }
    return Buffer.from(input as ArrayBuffer).toString();
  }
}

global.TextEncoder = MockTextEncoder as any;
global.TextDecoder = MockTextDecoder as any;

// Jest globals를 Vitest로 대체
global.jest = vi;

// Chakra UI 관련 모킹
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Chakra UI의 포털 관련 모킹
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver 모킹
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
