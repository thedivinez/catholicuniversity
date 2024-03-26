import Footer from "@/components/Footer";
import Dashboard from "@/components/home";
import Header from "@/components/home/Header";
import SideBar from "@/components/home/SideBar";

export default function Home() {
  return (
    <main className="flex max-h-screen h-screen w-screen flex-col items-center justify-between overflow-hidden">
      <Header />
      <div className="flex w-full h-full">
        <SideBar />
        <Dashboard />
      </div>
      <Footer />
    </main>
  );
}
