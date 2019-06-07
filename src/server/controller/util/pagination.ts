export class Paginate {
  totalItems: number;
  pageSize: number;
  maxPages: number;

  constructor(totalItems: number, pageSize: number, maxPages: number) {
    this.totalItems = totalItems;
    this.pageSize = pageSize;
    this.maxPages = maxPages;
  }

  // Chunks based on pageSize and currentPage
  public getChunk = (dataArray: any[], currentPage: number) => {
    const chunks = dataArray.reduce((all,one,i) => {
      const ch = Math.floor(i / this.pageSize); 
      all[ch] = [].concat((all[ch]||[]),one); 
      return all
   }, []);
   // Return chunk for currentPage
   return chunks[currentPage - 1];
  };

  // get pagination response
  public getPagination = (currentPage: number) => {
    let totalPages = Math.ceil(this.totalItems / this.pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= this.maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let deltaBeforeCurrentPage = Math.floor(this.maxPages / 2);
      let deltaAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
      if (currentPage <= deltaBeforeCurrentPage) {
        startPage = 1;
        endPage = this.maxPages;
      } else if (currentPage + deltaAfterCurrentPage >= totalPages) {
        startPage = totalPages - this.maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - deltaBeforeCurrentPage;
        endPage = currentPage + deltaAfterCurrentPage;
      }
    }

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: this.totalItems,
      currentPage: currentPage,
      pageSize: this.pageSize,
      totalPages: totalPages,
      pages: pages
    };
  }
}