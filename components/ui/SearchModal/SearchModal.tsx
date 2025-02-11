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
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@heroui/kbd";
import { useSearchMovies } from "@/libs/hooks/useSearchModal";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";

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
        onPress={onOpen}
        aria-label="Search"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            Ctrl + K
          </Kbd>
        }
        className="bg-default-700/10 hover:bg-default-700/20 "
        type="button"
      >
        Search
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          closeButton: "hidden",
          base: ["bg-background", "outline outline-1 outline-white/20"],
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              autoFocus
              placeholder="Procure por filmes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            />
          </ModalHeader>
          <Divider />
          <ModalBody>
            <Listbox variant="bordered" color="secondary">
              {movies && (
                <ListboxSection
                  title={searchQuery ? "Resultados" : "Tendências"}
                >
                  {movies.map((movie) => (
                    <ListboxItem href={`/movie/${movie.id}`} key={movie.id}>
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
