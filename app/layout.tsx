import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
// import NoticeWidget from "@/components/Notifications";
import { Toaster } from "react-hot-toast";
// import { getNotifications } from "@/services/notifications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Noza Convent School",
  description: "Quality education and holistic development.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { notifications: notificationItems } = await getNotifications();

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}

        <Footer />

        {/* <NoticeWidget notifications={notificationItems} /> */}
        <FloatingActions />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: "12px",
              background: "#111827",
              color: "#fff",
            },
            success: {
              style: {
                background: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
