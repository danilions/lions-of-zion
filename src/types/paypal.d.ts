// Type declarations for PayPal SDK
interface PayPalHostedButtons {
  render: (selector: string) => void;
}

interface PayPalNamespace {
  HostedButtons: (options: { hostedButtonId: string }) => PayPalHostedButtons;
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

export {};
