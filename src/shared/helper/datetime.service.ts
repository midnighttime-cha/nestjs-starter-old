export class DatetimeService {
  datetimeToServer(datetime = null) {
    const _datetime = this.datetimeShort(datetime);
    const dt = _datetime.split(' ');
    const _date = dt[0].split('/');
    const _time = dt[1];

    return `${_date[2]}-${_date[1]}-${_date[0]} ${_time}`;
  }

  dateToServer(date = null) {
    const _date = this.dateShort(date).split('/');
    return `${_date[2]}-${_date[1]}-${_date[0]}`;
  }

  datetimeShort(datetime = null) {
    let d: any;
    if (datetime) {
      d = new Date(datetime);
    } else {
      d = new Date();
    }

    return d.toLocaleString('en-TH', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hourCycle: "h24",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).replace(', ', ' ');
  }

  dateShort(date = null) {
    let d: any;
    if (date) {
      d = new Date(date);
    } else {
      d = new Date();
    }

    const _date = d.toLocaleString('en-TH', {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const [months, dates, years] = _date.split('/');
    return `${dates}/${months}/${years}`;
  }

  addDate(date = null, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  format(type, datetime = null) {
    let date_str = "";
    let d: any;
    switch (type) {
      case 'YY':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(2, 4)}`;
        break;
      case 'YYYY':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(2, 4)}`;
        break;
      case 'MM':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(5, 7)}`;
        break;
      case 'DD':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(8, 10)}`;
        break;
      case 'YYMM':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(2, 4)}${d.slice(5, 7)}`;
        break;
      case 'YYYYMM':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(0, 4)}${d.slice(5, 7)}`;
        break;
      case 'YYMMDD':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(2, 4)}${d.slice(5, 7)}${d.slice(8, 10)}`;
        break;
      case 'YYYYMMDD':
        date_str = (this.dateToServer(datetime)).replace('-', '');
        break;
      case 'YY-MM':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(2, 4)}-${d.slice(5, 7)}`;
        break;
      case 'YY-MM-DD':
        d = this.dateToServer(datetime);
        date_str = `${d.slice(2, 4)}-${d.slice(5, 7)}-${d.slice(8, 10)}`;
        break;
      case 'YYYY-MM':
        d = this.dateToServer(datetime);
        date_str = d.slice(0, 7);
        break;
      case 'YYYY-MM-DD':
        date_str = this.dateToServer(datetime);
        break;
      case 'DD/MM/YY':
        d = this.dateShort(datetime);
        date_str = `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(2, 4)}`;
        break;
      case 'DD/MM/YYYY':
        date_str = this.dateShort(datetime);
        break;
      case 'H':
        d = this.datetimeShort(datetime);
        date_str = `${d.slice(11, 13)}`;
        break;
      case 'i':
        d = this.datetimeShort(datetime);
        date_str = `${d.slice(14, 16)}`;
        break;
      case 's':
        d = this.datetimeShort(datetime);
        date_str = `${d.slice(17, 19)}`;
        break;
      case 'H:i':
        d = this.datetimeShort(datetime);
        date_str = `${d.slice(11, 13)}:${d.slice(14, 16)}`;
        break;
      case 'H:i:s':
        d = this.datetimeShort(datetime);
        date_str = `${d.slice(11, 13)}:${d.slice(14, 16)}${d.slice(17, 19)}`;
        break;
      case 'YYYY-MM-DD H:i:s':
        date_str = this.datetimeToServer(datetime);
        break;
      case 'DD/MM/YYYY H:i:s':
        date_str = this.datetimeShort(datetime);
        break;
    }
    return date_str;
  }
}