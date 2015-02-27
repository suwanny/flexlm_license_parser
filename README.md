# flexlm_license_parser
Simple Flexlm License Parser

## Install

```bash
$ npm install -save flexlm-parser

or

$ npm install -g flexlm-parser
```

## how to use the parser

```bash
$ flexlmparse license_file.lic

```

## how to use in your code

```javascript
new LicenseFileParser().parse(filePath, function (err, info){
  if (err) {
    console.error(err);
  }
  console.dir(info);
});

=>

{ vendor: { vendor: 'VMWARELM', vendor_daemon_path: 'port=27010' },
  server: { use: true, host: 'this_host', hostid: 'ANY', port: '27000' },
  features:
   [ { type: 'INCREMENT',
       name: 'PROD_ESX_FULL',
       vendor: 'VMWARELM',
       version: '2005.05',
       expiredDate: 'permanent',
       capacity: '32' },


```


### [License File Format](http://www.polarhome.com:823/doc/library/SGI_bookshelves/SGI_Developer/books/FLEXlm_PG/sgi_html/ch10.html)

- http://opendtect.org/lic/doc/endusermanual/chap10.htm
- http://blog.openlm.com/?p=1974
- http://www.sissa.it/download/online-manuals/portland-doc/flexfaq/chap3.htm
- http://opendtect.org/lic/doc/endusermanual/chap3.htm

