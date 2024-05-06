import { Content, fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-react-nextjs';

interface MyPageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = '460155f6fa9349239ac51ff1c9bdfe59';

export default async function Page(props: MyPageProps) {
  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    model: 'page',
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  return <Content content={content} model="page" apiKey={apiKey} />;
}
export const revalidate = 1;
