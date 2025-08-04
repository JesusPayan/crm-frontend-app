import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fields: string[]): any[] {
    if (!items) return [];
    if (!searchText || !fields || fields.length === 0) return items;

    const lowerSearch = searchText.toLowerCase();

    return items.filter(item =>
      fields.some(field =>
        item[field]?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }
}