import classNames from 'classnames';
import React from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';
import { Button, IconButton, Text } from '../';
import {
  extractMarginProps,
  GetPropDefTypes,
  MarginProps,
  PropsWithoutRefOrColor,
  withBreakpoints,
  withMarginProps,
} from '../../helpers';
import { toastPropDefs } from './toast.props';

type ToastRootElement = React.ElementRef<'div'>;
type ToastRootOwnProps = GetPropDefTypes<typeof toastPropDefs>;
interface ToastRootProps
  extends PropsWithoutRefOrColor<'div'>,
    MarginProps,
    ToastRootOwnProps {
  asChild?: boolean;
  toastId: string | number;
  promise?: {
    promise: Promise<any>;
    loadingMessage?: React.ReactNode;
    successMessage?: React.ReactNode;
    errorMessage?: React.ReactNode;
  };
}

type ToastRootContextValue = ToastRootOwnProps;
const ToastRootContext = React.createContext<ToastRootContextValue>({});

const ToastRoot = React.forwardRef<ToastRootElement, ToastRootProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      toastId,
      children,
      className,
      size = toastPropDefs.size.default,
      color = toastPropDefs.color.default,
      highContrast = toastPropDefs.highContrast.default,
      ...rootProps
    } = marginRest;
    return (
      <div
        data-accent-color={color}
        {...rootProps}
        className={classNames(
          'rt-ToastRoot',
          className,
          withBreakpoints(size, 'rt-r-size'),
          { 'rt-high-contrast': highContrast },
          withMarginProps(marginProps),
        )}
        ref={forwardedRef}
      >
        <ToastRootContext.Provider
          value={React.useMemo(
            () => ({ size, color, highContrast }),
            [size, color, highContrast],
          )}
        >
          {children}
          <IconButton
            variant="soft"
            size={'1'}
            highContrast={highContrast}
            onClick={() => sonnerToast.dismiss(toastId)}
          />
        </ToastRootContext.Provider>
      </div>
    );
  },
);

type RenderMessage<T> = (promiseResult: T) => string;

const toast = {
  neutral: (message: string | React.ReactNode) =>
    sonnerToast.custom((toastId) => {
      return (
        <ToastRoot color="gray" toastId={toastId}>
          <Text>{message}</Text>
        </ToastRoot>
      );
    }, {}),
  success: (message: string | React.ReactNode) =>
    sonnerToast.custom((toastId) => {
      return (
        <ToastRoot color="green" toastId={toastId}>
          <Text>{message}</Text>
        </ToastRoot>
      );
    }),
  info: (message: string | React.ReactNode) =>
    sonnerToast.custom((toastId) => {
      return (
        <ToastRoot color="blue" toastId={toastId}>
          <Text>{message}</Text>
        </ToastRoot>
      );
    }),
  warning: (message: string | React.ReactNode) =>
    sonnerToast.custom((toastId) => {
      return (
        <ToastRoot color="yellow" toastId={toastId}>
          <Text>{message}</Text>
        </ToastRoot>
      );
    }),
  error: (message: string | React.ReactNode) =>
    sonnerToast.custom((toastId) => {
      return (
        <ToastRoot color="red" toastId={toastId}>
          <Text>{message}</Text>
        </ToastRoot>
      );
    }),
  promise: function <T>(
    promise: Promise<T>,
    options: {
      loading: {
        title: string;
        description?: string;
        action?: {
          label: React.ReactNode;
          onClick: () => void;
        };
      };
      success: {
        title: string | RenderMessage<T>;
        description?: string | RenderMessage<T>;
        action?: {
          label: React.ReactNode;
          onClick: () => void;
        };
      };
      error: {
        title: string | RenderMessage<T>;
        description?: string | RenderMessage<T>;
        action?: {
          label: React.ReactNode;
          onClick: () => void;
        };
      };
    },
  ) {
    return sonnerToast.custom((toastId) => {
      return (
        <PromisedToast toastId={toastId} options={options} promise={promise} />
      );
    });
  },
  dismiss: sonnerToast.dismiss,
};

export { toast, Toaster };

const PromisedToast = <T,>({
  toastId,
  promise,
  options,
}: {
  toastId: number | string;
  promise: Promise<T>;
  options: {
    loading: {
      title: string;
      description?: string;
      action?: {
        label: React.ReactNode;
        onClick: () => void;
      };
    };
    success: {
      title: string | RenderMessage<T>;
      description?: string | RenderMessage<T>;
      action?: {
        label: React.ReactNode;
        onClick: () => void;
      };
    };
    error: {
      title: string | RenderMessage<T>;
      description?: string | RenderMessage<T>;
      action?: {
        label: React.ReactNode;
        onClick: () => void;
      };
    };
  };
}) => {
  const { loading, success, error } = options;
  const [state, setState] = React.useState<{
    status: 'loading' | 'success' | 'error';
    title: string;
    description?: string;
    action?: {
      label: React.ReactNode;
      onClick: () => void;
    };
  }>({
    status: 'loading',
    title: loading.title,
    description: loading.description,
    action: loading.action,
  });

  React.useEffect(() => {
    promise
      .then((data) => {
        const title =
          typeof success.title === 'function'
            ? success.title(data)
            : success.title;
        const description =
          typeof success.description === 'function'
            ? success.description(data)
            : success.description;
        setState({
          status: 'success',
          title,
          description,
          action: success.action,
        });
      })
      .catch((err) => {
        const title =
          typeof error.title === 'function' ? error.title(err) : error.title;
        const description =
          typeof error.description === 'function'
            ? error.description(err)
            : error.description;
        setState({
          status: 'success',
          title,
          description,
          action: error.action,
        });
      });
  }, [promise]);

  const statusColor =
    state.status === 'loading'
      ? 'gray'
      : state.status === 'success'
      ? 'green'
      : 'red';
  const statusIcon =
    state.status === 'loading'
      ? '🤔'
      : state.status === 'success'
      ? '🎉'
      : '🤬';
  return (
    <ToastRoot color={statusColor} toastId={toastId}>
      <div>{statusIcon}</div>
      <Text>{state.title}</Text>
      {state.description ? <Text>{state.description}</Text> : null}
      {state.action ? (
        <Button onClick={state.action.onClick}>{state.action.label}</Button>
      ) : null}
    </ToastRoot>
  );
};
