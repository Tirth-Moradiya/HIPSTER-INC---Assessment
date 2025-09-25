  // Simple fetch helpers to allow easy switch to remote endpoints later
  const API_BASE = import.meta.env.VITE_API_BASE || ''

  // If provided, this full URL will be used directly. Otherwise fall back to local JSON.
  const WP_SERVICES_URL =
    import.meta.env.VITE_WP_SERVICES_URL || 'http://localhost:10004/wp-json/wp/v2/services?_embed'

    export async function fetchServices() {
      const useWordPress = true;
      const url = useWordPress
        ? WP_SERVICES_URL
        : API_BASE
        ? `${API_BASE}/services`
        : '/data/services.json';
    
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch services');
      const raw = await res.json();
    
      if (Array.isArray(raw)) {
        return raw.map((item) => {
          const title = item?.title?.rendered ?? '';
          const contentHtml = item?.content?.rendered ?? '';
          const description = contentHtml.replace(/<[^>]+>/g, '').trim();
    
          // Featured image from WP, fallback to ACF imageurl
          const mediaUrl =
            item?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            item?.acf?.imageurl ||
            '';
    
          // Category fallback: ACF first, then taxonomy
          const category =
            item?.acf?.category ||
            (() => {
              const termGroups = item?._embedded?.['wp:term'] || [];
              const firstTerm =
                Array.isArray(termGroups) &&
                termGroups.length > 0 &&
                Array.isArray(termGroups[0])
                  ? termGroups[0][0]
                  : undefined;
              return firstTerm?.name || 'Services';
            })();
    
          // Price from ACF (coerce to number if present)
          const priceRaw = item?.acf?.price;
          const price = priceRaw != null && priceRaw !== '' && !Number.isNaN(Number(priceRaw))
            ? Number(priceRaw)
            : null;
    
          return {
            id: item.id,
            title,
            description,
            category,
            price,
            image: mediaUrl,
          };
        });
      }
    
      return raw;
    }
    export async function fetchBlogs() {
      const useWordPress = true;
      const WP_BLOGS_URL =
        import.meta.env.VITE_WP_BLOGS_URL || 'http://localhost:10004/wp-json/wp/v2/posts?_embed';
      
      const url = useWordPress
        ? WP_BLOGS_URL
        : API_BASE
        ? `${API_BASE}/blogs`
        : '/data/blogs.json';
    
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const raw = await res.json();
    
      if (Array.isArray(raw)) {
        return raw.map((item) => {
          const title = item?.title?.rendered ?? item?.acf?.title ?? '';
          
          // Use WP content, fallback to ACF content
          const contentHtml = item?.content?.rendered ?? item?.acf?.content ?? '';
          const description = contentHtml.replace(/<[^>]+>/g, '').trim();
    
          // Use WP excerpt if exists, fallback to first 150 chars of description
          const excerpt = item?.excerpt?.rendered
            ? item.excerpt.rendered.replace(/<[^>]+>/g, '').trim()
            : description.slice(0, 150);
    
          // Featured image: WP _embedded first, then ACF image
          const imageUrl =
            item?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            item?.acf?.image ||
            '/vite.svg';
    
          // Date: WP date first, fallback to ACF date
          const date = item.date || item?.acf?.date || null;
    
          return {
            id: item.id,
            slug: item.slug,
            title,
            description,
            excerpt,
            date,
            image: imageUrl,
            link: item.link,
          };
        });
      }
    
      return raw;
    }
    
    
    

