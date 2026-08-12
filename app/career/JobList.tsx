"use client";

import { useMemo, useState } from "react";
import { Briefcase, ChevronDown, MapPin, Search } from "lucide-react";
import { jobs } from "@/lib/data/jobs";
import { site } from "@/lib/site";

export default function JobList() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((job) =>
      [job.title, job.location, job.department, job.type].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:mb-16">
        <div className="flex flex-1 items-center gap-4 rounded-full border border-gray-100 bg-white px-6 py-4 shadow-sm">
          <Search className="h-5 w-5 shrink-0 text-gray-300" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles or locations..."
            aria-label="Search roles or locations"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-dolce-ink outline-none sm:text-base"
          />
        </div>
      </div>

      <div>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold text-dolce-green">Opened Positions</h2>
          <span className="shrink-0 rounded-full bg-dolce-bronze/5 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-dolce-bronze uppercase">
            {visible.length} {visible.length === 1 ? "Role" : "Roles"}
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-gray-400 italic">No roles match that search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((job, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={job.title}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="min-w-0">
                      <span className="block text-lg font-bold text-dolce-ink sm:text-xl">
                        {job.title}
                      </span>
                      <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5" />
                          {job.type}
                        </span>
                      </span>
                    </span>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-dolce-green transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-6 border-t border-gray-50 px-5 py-6 sm:px-6">
                        <p className="text-sm leading-relaxed text-gray-600">{job.description}</p>

                        {(
                          [
                            ["Responsibilities", job.responsibilities],
                            ["Qualifications", job.qualifications],
                            ["Benefits", job.benefits],
                          ] as const
                        ).map(([heading, list]) => (
                          <div key={heading}>
                            <h3 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-dolce-bronze uppercase">
                              {heading}
                            </h3>
                            <ul className="space-y-2">
                              {list.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 text-sm leading-relaxed text-gray-600"
                                >
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dolce-bronze" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        <a
                          href={`mailto:${site.email}?subject=${encodeURIComponent(
                            `Application: ${job.title}`,
                          )}`}
                          className="inline-flex w-full items-center justify-center rounded-full bg-dolce-green px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-dolce-bronze sm:w-auto"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
