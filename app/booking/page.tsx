import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book an Appointment | Dolce Estetica",
  description:
    "Select your preferred service and clinic location to begin your journey with Dolce Estetica.",
};

/** `?category=` / `?service=` arrive from the nav dropdowns and the footer service links. */
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

export default async function BookingPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <h1 className="mb-4 font-serif text-4xl font-bold text-dolce-ink sm:text-5xl lg:text-6xl">
            Book Your Appointment
          </h1>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Experience the art of aesthetic perfection. Select your preferred service and location
            to begin your journey with Dolce Estetica.
          </p>
        </div>

        <BookingForm
          presetCategory={first(params.category)}
          presetService={first(params.service)}
        />
      </section>

      <Footer />
    </main>
  );
}
