import Link from "next/link";

export default function AppFooter() {
  return (
    <footer className='border-t bg-muted'>
      <div className='container px-4 md:px-6 py-12 mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
          <div>
            <Link href='/' className='flex items-center mb-4'>
              <span className='text-xl font-semibold'>Loogo</span>
            </Link>
            <p className='text-sm text-muted-foreground'>The trusted email platform for tech</p>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Product</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Features
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Resources</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Docs
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Company</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  About
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Legal</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Terms
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
