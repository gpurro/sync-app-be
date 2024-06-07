import qs from 'qs';
import { URL } from 'url';

export class Pagination {
  
  total!: number;
  offset!: number;
  limit!: number;
  totalPage!: number;
  number!: number;
  size!: number;
  first!: number;
  last!: number;
  prev!: number|null;
  next!: number|null;

  constructor(
    pageQuery: any, 
    total: number) {

      // Select the pagination strategy
      if (pageQuery) {
        if (pageQuery.number != null) {
          this.paginationPage(pageQuery.number, pageQuery.size, total);
        }
    
        if (pageQuery.offset != null) {
          this.paginationOffset(pageQuery.offset, pageQuery.limit, total);
        }
      }
  }

  private paginationPage(number: number, size: number, total: number) {
  
    var totalPage = Math.ceil(total / size);
  
    this.total = total;
    this.totalPage = totalPage;
    this.number = number;
    this.size = size;
    this.first = 1;
    this.last = totalPage === 0 ? 1 : totalPage;
    this.prev = number > 1 ? number - 1 : null;
    this.next = number !== totalPage ? number + 1 : null;
  }

  private paginationOffset(offset: number, limit: number, total: number) {
  
    const lastOffset = total - ((total % limit) || limit);
    const prevOffset = offset - limit;
  
    this.total = total;
    this.offset = offset;
    this.limit = limit;
    this.first = 0;
    this.last = lastOffset > 0 ? lastOffset : 0;
    this.prev = prevOffset >= 0 ? prevOffset : null;
    this.next = offset + limit < total ? offset + limit : null;
  }

  public  getLinks(baseUrl: string, uri: any) {

    let links = {} as Record<string, any>;
  
    links.self = uri;
    links.first = this.paginationLinks(baseUrl, uri, this.buildPageQuery(this.first, this.limit));
    links.last = this.paginationLinks(baseUrl, uri, this.buildPageQuery(this.last, this.limit));
    if (this.prev != null) {
      links.prev = this.paginationLinks(baseUrl, uri, this.buildPageQuery(this.prev, this.limit));
    }
    if (this.next != null) {
      links.next = this.paginationLinks(baseUrl, uri, this.buildPageQuery(this.next, this.limit));
    }
  
    return links;
  };

  private buildPageQuery(offsetNumber: any, limitSize: any) {
    const firstParam:string = this.number ? 'number' : 'offset';
    const secondParam: string = this.number ? 'size' : 'limit';

    let pagination = {} as Record<string, any>;
    pagination.page = {};
    pagination.page[firstParam] = offsetNumber;
    pagination.page[secondParam] = limitSize;

    return pagination;
  };

  private paginationLinks(baseUrl: string, uri: any, query: any) {
    
    // var info = URL.parse(uri);
    // var queryObj = qs.parse(info.query);
  
    // queryObj = { ...queryObj, ...query};
    // info.search = '?' + qs.stringify(queryObj, {
    //   encode: false
    // });
  
    // return URL.format(info);

    let newUrl = new URL(uri, baseUrl);
    let queryObj = qs.parse(newUrl.search, { ignoreQueryPrefix: true });

    queryObj = { ...queryObj, ...query};
    newUrl.search = '?' + qs.stringify(queryObj, {
      encode: false
    });

    return newUrl.toString();
  };
}


