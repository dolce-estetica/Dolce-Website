import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book an Appointment | Dolce Estetica",
  description:
    "Select your preferred service and clinic location to begin your journey with Dolce Estetica.",
};

export default function BookingPage() {
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

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-dolce-green border-t-transparent" />
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
