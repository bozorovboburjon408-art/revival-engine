import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Tests = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center"><h1 className="font-display text-4xl mb-4">Testlar</h1><p className="text-muted-foreground">Tez orada...</p></div>
    </main>
    <Footer />
  </div>
);

export default Tests;
