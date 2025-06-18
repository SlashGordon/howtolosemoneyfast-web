/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  safelist: [
    'bg-gray-900',
    'text-white',
    'min-h-screen',
    'container',
    'mx-auto',
    'px-4',
    'py-16',
    'relative',
    'z-10',
    'text-center',
    'mb-16',
    'mb-4',
    'text-3xl',
    'text-5xl',
    'md:text-6xl',
    'font-extrabold',
    'text-red-500',
    'bg-white',
    'focus:outline-none',
    'focus:shadow-outline',
    'border',
    'border-gray-300',
    'rounded-lg',
    'py-2',
    'px-4',
    'block',
    'w-full',
    'appearance-none',
    'leading-normal',
    'animate-bounce',
    'inline-block',
    'absolute',
    'inset-0',
    'bg-black',
    'opacity-20',
    'overflow-hidden'
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'money-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzAgTDYwIDMwIE02MCAwIEwzMCAwIEwzMCAzMCBMMCAwIEwwIDYwIEwzMCA2MCBMMzAgMzAgTDYwIDYwIFoiIHN0cm9rZT0iIzIyMjIyMjEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')",
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(239, 68, 68, 0.3)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}