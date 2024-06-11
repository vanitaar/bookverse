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

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [blurb, setBlurb] = useState("");
  const [dedication, setDedication] = useState("");
  const [publication_date, setPublicationDate] = useState<Date | string>("");
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
  const handlePublicationDateChange = (date: Date | string) => {
    if (typeof date === "string") {
      setPublicationDate(new Date(date)); // Convert string to Date object
    } else {
      setPublicationDate(date); // Use Date object directly
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
      if (user) {
        queryClient.invalidateQueries([
          "books",
          user.id,
        ] as unknown as InvalidateQueryFilters);
        navigate("/dashboard");
      }
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
      series_title: isSeries ? seriesTitle : undefined,
      series_status: isSeries ? seriesStatus : undefined,
      order_in_series: isSeries ? order_in_series : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Blurb</label>
        <textarea value={blurb} onChange={(e) => setBlurb(e.target.value)} />
      </div>
      <div>
        <label>Dedication</label>
        <textarea
          value={dedication}
          onChange={(e) => setDedication(e.target.value)}
        />
      </div>
      <div>
        <label>Publication Date</label>
        <input
          type="date"
          value={
            typeof publication_date === "string"
              ? publication_date
              : publication_date.toISOString().split("T")[0]
          }
          onChange={(e) => handlePublicationDateChange(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={format_ebook}
            onChange={(e) => setFormatEbook(e.target.checked)}
          />{" "}
          Ebook
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={format_physical}
            onChange={(e) => setFormatPhysical(e.target.checked)}
          />{" "}
          Physical
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={format_audio}
            onChange={(e) => setFormatAudio(e.target.checked)}
          />{" "}
          Audio
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSeries}
            onChange={(e) => setIsSeries(e.target.checked)}
          />{" "}
          Part of a Series
        </label>
      </div>
      {isSeries && (
        <>
          <div>
            <label>Series Title</label>
            <input
              value={seriesTitle}
              onChange={(e) => setSeriesTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Order in Series</label>
            <input
              type="number"
              value={order_in_series}
              onChange={(e) => setOrderInSeries(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Series Status</label>
            <select
              value={seriesStatus}
              onChange={(e) =>
                setSeriesStatus(
                  e.target.value as "incomplete" | "complete" | "standalone"
                )
              }
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
              <option value="standalone">Standalone</option>
            </select>
          </div>
        </>
      )}
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
