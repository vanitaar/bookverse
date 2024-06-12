import React, { useState } from "react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addNewBook } from "../../../utils/apiBookClient";
import useAuthStore from "../../../stores/authStore";
import { Book } from "../../../types/dataTypes";
import { toast } from "react-hot-toast";

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [blurb, setBlurb] = useState("");
  const [dedication, setDedication] = useState("");
  const [publication_date, setPublicationDate] = useState<Date | undefined>(
    undefined
  );
  const [format_ebook, setFormatEbook] = useState(false);
  const [format_physical, setFormatPhysical] = useState(false);
  const [format_audio, setFormatAudio] = useState(false);
  const [isSeries, setIsSeries] = useState(false);
  const [seriesTitle, setSeriesTitle] = useState("");
  const [seriesStatus, setSeriesStatus] = useState<
    "incomplete" | "complete" | "standalone"
  >("incomplete");
  const [order_in_series, setOrderInSeries] = useState<number | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  //   // Ensure user is defined and not null //moved conditional logic inside mutate function
  //   if (!user) {
  //     return <div>Loading...</div>;
  //   }
  const handlePublicationDateChange = (date: Date | string | null) => {
    if (date instanceof Date) {
      setPublicationDate(date); // if it's already a Date object, set it directly
    } else if (typeof date === "string") {
      setPublicationDate(new Date(date)); // if str coonvert to Date object
    } else {
      setPublicationDate(undefined); // reset to undefined if null or invalid
    }
  };

  const mutation = useMutation({
    mutationFn: (newBook: Partial<Book>) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return addNewBook(Number(user.id), newBook);
    },
    onSuccess: () => {
      toast.success("Book added to your Booklist successfully!");
      if (user) {
        queryClient.invalidateQueries([
          "books",
          user.id,
        ] as unknown as InvalidateQueryFilters);
        navigate("/dashboard");
      }
    },
    onError: (error: Error) => {
      toast.error(`Error adding book: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      image_url,
      blurb,
      dedication,
      publication_date,
      format_ebook,
      format_physical,
      format_audio,
      series_title: isSeries ? seriesTitle : "standalone",
      series_status: isSeries ? seriesStatus : "standalone",
      order_in_series: isSeries ? order_in_series : undefined,
    });
  };

  return (
    <div className="mt-20 p-6 bg-gray-700 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block mb-1">Blurb</label>
          <textarea
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block mb-1">Dedication</label>
          <textarea
            value={dedication}
            onChange={(e) => setDedication(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block mb-1">Publication Date</label>
          <input
            type="date"
            value={
              publication_date
                ? publication_date.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handlePublicationDateChange(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block mb-1">
            <input
              type="checkbox"
              checked={format_ebook}
              onChange={(e) => setFormatEbook(e.target.checked)}
              className="mr-2"
            />
            Ebook
          </label>
        </div>
        <div>
          <label className="block mb-1">
            <input
              type="checkbox"
              checked={format_physical}
              onChange={(e) => setFormatPhysical(e.target.checked)}
              className="mr-2"
            />
            Physical
          </label>
        </div>
        <div>
          <label className="block mb-1">
            <input
              type="checkbox"
              checked={format_audio}
              onChange={(e) => setFormatAudio(e.target.checked)}
              className="mr-2"
            />
            Audio
          </label>
        </div>
        <div>
          <label className="block mb-1">
            <input
              type="checkbox"
              checked={isSeries}
              onChange={(e) => setIsSeries(e.target.checked)}
              className="mr-2"
            />
            Part of a Series
          </label>
        </div>
        {isSeries && (
          <>
            <div>
              <label className="block mb-1">Series Title</label>
              <input
                type="text"
                value={seriesTitle}
                onChange={(e) => setSeriesTitle(e.target.value)}
                required
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Order in Series</label>
              <input
                type="number"
                value={order_in_series || ""}
                onChange={(e) => setOrderInSeries(Number(e.target.value))}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Series Status</label>
              <select
                value={seriesStatus}
                onChange={(e) =>
                  setSeriesStatus(e.target.value as "incomplete" | "complete")
                }
                className="input"
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
