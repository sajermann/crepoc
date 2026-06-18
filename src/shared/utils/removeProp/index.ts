export function removeProp(props: Record<string, unknown>, propName: string[]) {
  const newProps = { ...props } as Record<string, unknown>;
  try {
    for (const item of propName) {
      delete newProps[item];
    }
  } catch (e) {
    console.error({ e });
  }

  return newProps;
}
