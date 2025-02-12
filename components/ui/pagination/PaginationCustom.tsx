"use client";

import { Button, Pagination } from "@heroui/react";

export default function PaginationCustom({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-row gap-5 w-full justify-center">
      <Button
        color="secondary"
        isDisabled={currentPage === 1}
        size="sm"
        variant="flat"
        onPress={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        Voltar
      </Button>
      <Pagination
        color="secondary"
        page={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
      <Button
        color="secondary"
        isDisabled={currentPage === totalPages}
        size="sm"
        variant="flat"
        onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        Próximo
      </Button>
    </div>
  );
}
