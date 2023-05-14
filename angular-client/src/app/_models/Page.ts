export class Page<T> {
    content!: T[];
    pageable: any;
    totalPages!: number;
    totalElements!: number;
    last!: boolean;
    size!: number;
    number!: number;
    sort: any;
    numberOfElements!: number;
    first!: boolean;
    empty!: boolean;
  }
  