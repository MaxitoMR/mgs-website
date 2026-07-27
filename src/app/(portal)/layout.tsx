export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* The portal has no site header/footer, so without this the page had no
     landmarks at all and every element sat outside the document structure. */
  return <main id="main-content">{children}</main>;
}
