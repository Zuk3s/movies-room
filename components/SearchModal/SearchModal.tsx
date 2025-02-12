"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Divider,
} from "@heroui/react";
import { Kbd } from "@heroui/kbd";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";

import { SearchIcon } from "@/components/icons";
import { useSearchMovies } from "@/libs/hooks/useSearchModal";

export function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, error } = useSearchMovies(searchQuery);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);

  return (
    <>
      <Button
        aria-label="Search"
        className="bg-default-700/10 hover:bg-default-800/10 text-default-900/60 hover:text-default-900/50"
        endContent={
          <Kbd
            className="hidden lg:inline-block bg-default-600/25"
            keys={["command"]}
          >
            Ctrl + K
          </Kbd>
        }
        startContent={<SearchIcon className="text-base flex-shrink-0" />}
        type="button"
        onPress={onOpen}
      >
        Search
      </Button>
      <Modal
        classNames={{
          closeButton: "hidden",
          base: ["bg-background", "outline outline-1 outline-white/20"],
        }}
        className="max-h-[60vh]"
        placement="center"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              classNames={{
                input: [
                  "bg-transparent",
                  "text-default-200",
                  "text-lg",
                  "placeholder:text-default-500",
                ],
                inputWrapper: [
                  "bg-transparent",
                  "backdrop-blur-sm",
                  "data-[hover=true]:bg-transparent",
                  "group-data-[focus=true]:bg-transparent",
                ],
              }}
              placeholder="Procure por filmes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </ModalHeader>
          <Divider />
          <ModalBody>
            <Listbox variant="flat" itemClasses={{ title: ["text-base"] }}>
              {movies && (
                <ListboxSection
                  title={searchQuery ? "Resultados" : "Tendências"}
                  classNames={{ heading: ["text-sm"] }}
                >
                  {movies.map((movie) => (
                    <ListboxItem
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onPress={onOpenChange}
                    >
                      {movie.title}
                    </ListboxItem>
                  ))}
                </ListboxSection>
              )}
            </Listbox>
            {error && <p>Error: {error}</p>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
