'use client';

import {
  faArrowUpFromBracket,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
  Accept,
  DropzoneInputProps,
  DropzoneOptions,
  useDropzone,
} from 'react-dropzone';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { Progress } from '../Progress';
import { Text } from '../Text';

type CustomProps = {
  title?: string;
  fileTypesAccepted?: Accept;
  fileSizeLimit?: string;
  uploadButtonText?: string;
  inputIcon?: IconDefinition;
  onDrop?: DropzoneOptions['onDrop'];
  onDropAccepted?: DropzoneOptions['onDropAccepted'];
  loading?: boolean | number;
  numberOfFiles?: number;
  errorMessage?: string | null;
  cancelButtonProps?: ButtonProps;
};

export type DropzoneProps = Omit<DropzoneInputProps, keyof CustomProps> &
  CustomProps;

const formatFileExtensions = (fileTypes: Accept): string => {
  const fileExtensions = Object.values(fileTypes).flat();

  if (fileExtensions.length === 0) {
    return '';
  }

  if (fileExtensions.length === 1) {
    return fileExtensions[0] + '.';
  }

  const lastExtension = fileExtensions.pop();
  return `${fileExtensions.join(', ')}, or ${lastExtension}.`;
};

export const Dropzone = ({
  title = 'Drop a file here or click to upload',
  fileTypesAccepted,
  fileSizeLimit,
  uploadButtonText = 'Upload file',
  inputIcon = faFile,
  className,
  onDrop,
  onDropAccepted,
  loading,
  numberOfFiles = 1,
  errorMessage,
  cancelButtonProps,
}: DropzoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: fileTypesAccepted,
    onDrop,
    onDropAccepted,
    maxFiles: numberOfFiles,
    disabled: Boolean(loading),
  });

  const hasFileRejections = (fileRejections || []).length > 0;

  return (
    <div
      {...getRootProps({
        className: cn(
          'bg-gray-50 biz-dark-1:bg-gray-900 border-gray-200 biz-dark-1:border-gray-700 border transition flex flex-col items-center justify-center rounded-lg p-8 focus-within:outline-none outline-none focus-within:ring focus-within:border-purple-500 focus-within:ring-purple-200 cursor-pointer',
          {
            'focus-within:border-purple-500 focus-within:ring-purple-200':
              isFocused || isDragAccept,
            '!border-status-error-500 focus-within:!ring-status-error-200':
              isDragReject || hasFileRejections,
          },
          className,
        ),
      })}
    >
      <input {...getInputProps()} disabled={Boolean(loading)} />
      <Icon
        icon={inputIcon}
        className="text-gray-400 biz-dark-1:text-gray-500 mb-4 h-14 w-14 text-[56px]"
      />

      <Text
        as="p"
        variant="h3"
        className="text-gray-950 biz-dark-1:text-gray-100 text-center sm:text-left"
      >
        {title}
      </Text>

      <Text
        as="p"
        variant="body2"
        className={cn(
          'text-gray-500 biz-dark-1:text-gray-400 mt-2 text-center sm:text-left',
          { 'opacity-0': Boolean(loading) },
          { 'text-status-error-500': isDragReject || hasFileRejections },
        )}
      >
        {errorMessage
          ? errorMessage
          : fileTypesAccepted && (
              <>Please use {formatFileExtensions(fileTypesAccepted)}</>
            )}
        {fileSizeLimit && !isDragReject && !hasFileRejections && (
          <> Max {fileSizeLimit}.</>
        )}
      </Text>

      {Boolean(loading) && typeof loading === 'number' ? (
        <Progress value={Math.round(loading)} className="mt-4" />
      ) : Boolean(loading) && typeof loading === 'boolean' ? (
        <Progress isIndeterminate={loading} value={100} className="mt-4" />
      ) : null}

      {uploadButtonText && !loading && (
        <Button
          colorScheme="dark-gray"
          variant="elevated"
          size="sm"
          className="mt-4"
          leftIcon={faArrowUpFromBracket}
        >
          {uploadButtonText}
        </Button>
      )}
      {Boolean(loading) && cancelButtonProps && (
        <Button
          colorScheme="dark-gray"
          variant="elevated"
          size="sm"
          className="mt-4"
          {...cancelButtonProps}
        />
      )}
    </div>
  );
};
