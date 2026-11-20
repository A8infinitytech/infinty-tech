// lib/device.ts
export function getDeviceName(userAgent: string | null | undefined): string {
  const ua = userAgent || "";

  const browser =
    (ua.match(/Edg\/([\d.]+)/) && `Edge ${ua.match(/Edg\/([\d.]+)/)![1].split(".")[0]}`) ||
    (ua.match(/OPR\/([\d.]+)/) && `Opera ${ua.match(/OPR\/([\d.]+)/)![1].split(".")[0]}`) ||
    (ua.match(/Firefox\/([\d.]+)/) && `Firefox ${ua.match(/Firefox\/([\d.]+)/)![1].split(".")[0]}`) ||
    (ua.match(/Chrome\/([\d.]+)/) && `Chrome ${ua.match(/Chrome\/([\d.]+)/)![1].split(".")[0]}`) ||
    (ua.match(/Version\/([\d.]+).*Safari/) && `Safari ${ua.match(/Version\/([\d.]+).*Safari/)![1].split(".")[0]}`) ||
    "Unknown browser";

  const os = /Windows NT 10/.test(ua)
    ? "Windows"
    : /Android/.test(ua)
      ? "Android"
      : /iPhone|iPad|iPod/.test(ua)
        ? "iOS"
        : /Mac OS X/.test(ua)
          ? "macOS"
          : /CrOS/.test(ua)
            ? "ChromeOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Unknown OS";

  return `${browser} on ${os}`;
}
