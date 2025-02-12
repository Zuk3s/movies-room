"use client";

import { Select, Selection, SelectItem } from "@heroui/react";
import { useState } from "react";

import { Video } from "@/types";

export default function Trailer({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Selection>(
    new Set([videos[0].key.toString()])
  );
  const selectedKey = Array.from(selectedVideo)[0];

  if (!videos) return <p>Nenhum trailer disponível.</p>;

  return (
    <section className="w-full flex flex-col items-center gap-6">
      <h1 className="text-2xl">Veja ao trailer</h1>
      <Select
        isRequired
        className="max-w-xs"
        label="Escolha um video"
        labelPlacement="inside"
        selectedKeys={selectedVideo}
        variant="bordered"
        onSelectionChange={setSelectedVideo}
      >
        {videos.map((video) => (
          <SelectItem
            key={video.key}
            className="text-lg text-default-700 space-y-4"
          >
            {video.name}
          </SelectItem>
        ))}
      </Select>
      <div className="w-full border border-default-200 rounded-md">
        <iframe
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-lg"
          loading="lazy"
          src={`https://www.youtube.com/embed/${selectedKey}`}
          title={videos.find((video) => video.key === selectedKey)?.name}
        />
      </div>
    </section>
  );
}
