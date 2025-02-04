"use client";

import { Video } from "@/types";
import { Select, Selection, SelectItem } from "@heroui/react";
import { useState } from "react";

export default function MovieTrailer({ videos }: { videos: Video[] }) {
  if (!videos) return <p>Nenhum trailer disponível.</p>;

  const [selectedVideo, setSelectedVideo] = useState<Selection>(new Set([]));
  const selectedKey = Array.from(selectedVideo)[0];

  return (
    <section className="w-full flex flex-col items-center gap-6">
      <h1 className="text-2xl">Veja ao trailer</h1>
      <Select
        className="max-w-xs"
        size="lg"
        labelPlacement="inside"
        label="Escolha um video"
        selectedKeys={selectedVideo}
        variant="bordered"
        onSelectionChange={setSelectedVideo}
        isRequired
      >
        {videos.map((video) => (
          <SelectItem className="text-xl" key={video.key}>
            {video.name}
          </SelectItem>
        ))}
      </Select>
      <div className="w-full border border-default-200 rounded-md">
        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${selectedKey}`}
          allowFullScreen
        />
      </div>
    </section>
  );
}
