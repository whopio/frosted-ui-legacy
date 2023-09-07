'use client';
import {
    IconDefinition,
    faArrowUpRightFromSquare,
    faBold,
    faHeading,
    faItalic,
    faLink,
    faListCheck,
    faListOl,
    faListUl,
    faStrikethrough,
    faTrash,
    faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tiptap/core';
import TiptapPlaceholder from '@tiptap/extension-placeholder';
import {
    AnyExtension,
    BubbleMenu,
    BubbleMenuProps,
    Content,
    EditorContent,
    EditorContentProps,
    EditorEvents,
    FocusPosition,
    useEditor,
} from '@tiptap/react';
import {
    Dispatch,
    FC,
    React,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { cn } from '../../lib/classnames';
import { IconButton } from '../IconButton';
import { Input, InputProps } from "../Input/Input";
import { Tooltip } from '../Tooltip';
// import { BaseExtensions } from '../helpers/editor-extensions';
// import { TiptapEditorProps } from '../helpers/editor-props';
// import { SlashCommand } from '../helpers/slash-command-extension';

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Continuous input focus because input is loosing it focus.
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      editor.chain().focus().setLink({ href: e.target.value }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const handleHotkeySave: NonNullable<InputProps['onKeyDown']> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        setIsOpen(false);
      }
    },
    [],
  );

  const handleToggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleRemoveLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setIsOpen(false);
  }, []);

  return (
    <div className="relative">
      <Tooltip description="Link" variant="compact" placement="top-center">
        <IconButton
          icon={faLink}
          onClick={handleToggleOpen}
          colorScheme={
            isOpen || editor.getAttributes('link').href ? 'purple' : 'dark-gray'
          }
          variant="blank"
          size="sm"
        />
      </Tooltip>
      {isOpen && (
        <section className="animate-in fade-in border-whop-stroke-dark bg-whop-background fixed top-full z-50 -ml-[37px] -mt-[42px] flex min-w-[316px] max-w-[12rem] overflow-hidden rounded-[10px] border p-1 shadow-none">
          <Input
            ref={inputRef}
            type="url"
            placeholder="URL"
            className="border-none shadow-none"
            size="sm"
            value={editor.getAttributes('link').href || ''}
            onChange={handleInputChange}
            onKeyDown={handleHotkeySave}
          />

          <div className="bg-whop-stroke-dark mx-1 w-[1px]" />

          <a href={editor.getAttributes('link').href || ''} target="_blank">
            <IconButton
              icon={faArrowUpRightFromSquare}
              onClick={handleClose}
              variant="blank"
              colorScheme="black"
              size="sm"
            />
          </a>
          <IconButton
            icon={faTrash}
            onClick={handleRemoveLink}
            variant="blank"
            colorScheme="error-red"
            size="sm"
          />
        </section>
      )}
    </div>
  );
};

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: IconDefinition;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const FullEditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'Heading',
      command: () =>
        props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => props.editor.isActive('heading', { level: 3 }),
      icon: faHeading,
    },
    {
      name: 'Bold',
      isActive: () => props.editor.isActive('bold'),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: faBold,
    },
    {
      name: 'Italic',
      isActive: () => props.editor.isActive('italic'),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: faItalic,
    },
    {
      name: 'Underline',
      isActive: () => props.editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: faUnderline,
    },
    {
      name: 'Strike-through',
      isActive: () => props.editor.isActive('strike'),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: faStrikethrough,
    },
    {
      name: 'Task List',
      icon: faListCheck,
      command: () => props.editor.chain().focus().toggleTaskList().run(),
      isActive: () => props.editor.isActive('taskItem'),
    },
    {
      name: 'Ordered List',
      icon: faListOl,
      command: () => props.editor.chain().focus().toggleOrderedList().run(),
      isActive: () => props.editor.isActive('orderedList'),
    },
    {
      name: 'Unordered List',
      icon: faListUl,
      command: () => props.editor.chain().focus().toggleBulletList().run(),
      isActive: () => props.editor.isActive('bulletList'),
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      interactive: true,
    },
  };

  const [linkSelectorOpen, setLinkSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="bg-whop-background border-whop-stroke-dark flex overflow-hidden rounded-[10px] border p-1 shadow-md"
    >
      <Tooltip
        description={items[0].name}
        variant="compact"
        placement="top-center"
      >
        <IconButton
          onClick={items[0].command}
          icon={items[0].icon}
          colorScheme={items[0].isActive() ? 'purple' : 'dark-gray'}
          variant="blank"
          size="sm"
        />
      </Tooltip>

      <LinkSelector
        editor={props.editor}
        isOpen={linkSelectorOpen}
        setIsOpen={setLinkSelectorOpen}
      />

      <div className="bg-whop-stroke-dark mx-1 w-[1px]" />

      {items.slice(1, -3).map((item, index) => (
        <Tooltip
          key={index}
          description={item.name}
          variant="compact"
          placement="top-center"
        >
          <IconButton
            onClick={item.command}
            icon={item.icon}
            colorScheme={item.isActive() ? 'purple' : 'dark-gray'}
            variant="blank"
            size="sm"
          />
        </Tooltip>
      ))}

      <div className="bg-whop-stroke-dark mx-1 w-[1px]" />

      {items.slice(-3).map((item, index) => (
        <Tooltip
          key={index}
          description={item.name}
          variant="compact"
          placement="top-center"
          contentClassName="whitespace-nowrap"
        >
          <IconButton
            onClick={item.command}
            icon={item.icon}
            colorScheme={item.isActive() ? 'purple' : 'dark-gray'}
            variant="blank"
            size="sm"
          />
        </Tooltip>
      ))}
    </BubbleMenu>
  );
};

export const CompactEditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'Bold',
      isActive: () => props.editor.isActive('bold'),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: faBold,
    },
    {
      name: 'Italic',
      isActive: () => props.editor.isActive('italic'),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: faItalic,
    },
    {
      name: 'Underline',
      isActive: () => props.editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: faUnderline,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      interactive: true,
    },
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="bg-whop-background border-whop-stroke-dark flex overflow-hidden rounded-[10px] border p-1 shadow-md"
    >
      {items.map((item, index) => (
        <Tooltip
          key={index}
          description={item.name}
          variant="compact"
          placement="top-center"
        >
          <IconButton
            onClick={item.command}
            icon={item.icon}
            colorScheme={item.isActive() ? 'purple' : 'dark-gray'}
            variant="blank"
            size="sm"
          />
        </Tooltip>
      ))}
    </BubbleMenu>
  );
};

const Placeholder = (placeholder: string) => {
  return TiptapPlaceholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }
      return placeholder;
    },
    includeChildren: true,
    emptyEditorClass:
      'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:text-whop-black before:opacity-50 before-pointer-events-none',
  });
};

export type RichTextEditorProps = {
  content?: Content;
  onUpdate?: (props: EditorEvents['update']) => void;
  slashCommands?: Boolean;
  placeholder?: string;
  bubbleMenuVariant?: 'compact' | 'full';
  autofocus?: FocusPosition | undefined;
  className?: string;
  onKeyDown?: EditorContentProps['onKeyDown'];
  dependencyArray?: unknown[];
  uploadImage?: (data: { file: File }) => Promise<{ imageUrl: string }>;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({
  content,
  onUpdate,
  slashCommands = true,
  placeholder,
  bubbleMenuVariant = 'full',
  autofocus = false,
  className,
  onKeyDown,
  dependencyArray = [],
  uploadImage,
}) => {
  const Extensions = [
    ...BaseExtensions,
    slashCommands ? SlashCommand({ uploadImage }) : undefined,
    placeholder ? Placeholder(placeholder) : undefined,
  ].filter(Boolean);

  const editor = useEditor(
    {
      content,
      extensions: Extensions as AnyExtension[],
      editorProps: TiptapEditorProps({ uploadImage }),
      onUpdate,
      autofocus,
    },
    dependencyArray,
  );

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={cn('relative min-h-[200px] w-full', className)}
    >
      {editor && (
        <>
          <EditorContent editor={editor} onKeyDown={onKeyDown} />
          {bubbleMenuVariant === 'full' ? (
            <FullEditorBubbleMenu editor={editor} />
          ) : (
            <CompactEditorBubbleMenu editor={editor} />
          )}
        </>
      )}
    </div>
  );
};
