import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

// Define more types here
const FORMAT_PDF = ['pdf'];
const FORMAT_TEXT = ['txt'];
const FORMAT_PHOTOSHOP = ['psd'];
const FORMAT_WORD = ['doc', 'docx'];
const FORMAT_EXCEL = ['xls', 'xlsx'];
const FORMAT_ZIP = ['zip', 'rar', 'iso'];
const FORMAT_ILLUSTRATOR = ['ai', 'esp'];
const FORMAT_POWERPOINT = ['ppt', 'pptx'];
const FORMAT_AUDIO = ['wav', 'aif', 'mp3', 'aac'];
const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'svg', 'webp'];
const FORMAT_VIDEO = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];

const iconUrl = (icon) => `${CONFIG.assetsDir}/assets/icons/files/${icon}.svg`;

// ----------------------------------------------------------------------

export function fileFormat(fileUrl) {
  // Handle null, undefined, or empty string
  if (!fileUrl) {
    return 'txt'; // Default format
  }

  let format;

  const fileByUrl = fileTypeByUrl(fileUrl);

  switch (true) {
    case FORMAT_TEXT.includes(fileByUrl):
      format = 'txt';
      break;
    case FORMAT_ZIP.includes(fileByUrl):
      format = 'zip';
      break;
    case FORMAT_AUDIO.includes(fileByUrl):
      format = 'audio';
      break;
    case FORMAT_IMG.includes(fileByUrl):
      format = 'image';
      break;
    case FORMAT_VIDEO.includes(fileByUrl):
      format = 'video';
      break;
    case FORMAT_WORD.includes(fileByUrl):
      format = 'word';
      break;
    case FORMAT_EXCEL.includes(fileByUrl):
      format = 'excel';
      break;
    case FORMAT_POWERPOINT.includes(fileByUrl):
      format = 'powerpoint';
      break;
    case FORMAT_PDF.includes(fileByUrl):
      format = 'pdf';
      break;
    case FORMAT_PHOTOSHOP.includes(fileByUrl):
      format = 'photoshop';
      break;
    case FORMAT_ILLUSTRATOR.includes(fileByUrl):
      format = 'illustrator';
      break;
    default:
      format = fileTypeByUrl(fileUrl);
  }

  return format;
}

// ----------------------------------------------------------------------

export function fileThumb(fileUrl) {
  let thumb;

  switch (fileFormat(fileUrl)) {
    case 'folder':
      thumb = iconUrl('ic-folder');
      break;
    case 'txt':
      thumb = iconUrl('ic-txt');
      break;
    case 'zip':
      thumb = iconUrl('ic-zip');
      break;
    case 'audio':
      thumb = iconUrl('ic-audio');
      break;
    case 'video':
      thumb = iconUrl('ic-video');
      break;
    case 'word':
      thumb = iconUrl('ic-word');
      break;
    case 'excel':
      thumb = iconUrl('ic-excel');
      break;
    case 'powerpoint':
      thumb = iconUrl('ic-power_point');
      break;
    case 'pdf':
      thumb = iconUrl('ic-pdf');
      break;
    case 'photoshop':
      thumb = iconUrl('ic-pts');
      break;
    case 'illustrator':
      thumb = iconUrl('ic-ai');
      break;
    case 'image':
      thumb = iconUrl('ic-img');
      break;
    default:
      thumb = iconUrl('ic-file');
  }
  return thumb;
}

// ----------------------------------------------------------------------

export function fileTypeByUrl(fileUrl) {
  return (fileUrl && fileUrl.split('.').pop()) || '';
}

// ----------------------------------------------------------------------

export function fileNameByUrl(fileUrl) {
  return (fileUrl && fileUrl.split('/').pop()) || 'unknown';
}

// ----------------------------------------------------------------------

export function fileData(file) {
  // Handle null or undefined file
  if (!file) {
    return {
      preview: null,
      name: 'Unknown file',
      type: 'unknown',
      size: undefined,
      path: null,
      lastModified: undefined,
      lastModifiedDate: undefined,
    };
  }

  // From url
  if (typeof file === 'string') {
    return {
      preview: file,
      name: fileNameByUrl(file),
      type: fileTypeByUrl(file),
      size: undefined,
      path: file,
      lastModified: undefined,
      lastModifiedDate: undefined,
    };
  }

  // From attachment object (chat attachments)
  if (file.name && file.type) {
    return {
      preview: file.preview,
      name: file.name,
      type: file.type,
      size: file.size,
      path: file.preview,
      lastModified: undefined,
      lastModifiedDate: undefined,
    };
  }

  // From file object
  return {
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  };
}
