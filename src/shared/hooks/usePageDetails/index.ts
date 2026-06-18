import { create } from 'zustand';

type TBreadcrumb = { label: string; path?: string };

interface Props {
  title: string;
  setTitle: (data: string) => void;
  breadcrumbs: TBreadcrumb[];
  setBreadcrumbs: (data: TBreadcrumb[]) => void;
}

export const usePageDetails = (
  initialProps?: Partial<Pick<Props, 'title' | 'breadcrumbs'>>,
) => {
  document.title = initialProps?.title
    ? `${initialProps.title} - Crepoc`
    : 'Crepoc';

  return create<Props>()(set => {
    return {
      title: '',
      breadcrumbs: [],
      ...initialProps,
      setTitle: (data: string) =>
        set(state => {
          document.title = data ? `${data} - Crepoc` : 'Crepoc';
          return {
            ...state,
            title: data,
          };
        }),
      setBreadcrumbs: (data: TBreadcrumb[]) =>
        set(state => ({
          ...state,
          breadcrumbs: [...data],
        })),
    };
  })();
};
