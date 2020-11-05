// @flow strict
import CMS from 'netlify-cms-app';
import PagePreview from './preview-templates/page-preview';
import PostPreview from './preview-templates/post-preview';

CMS.init();

CMS.registerPreviewTemplate('pages', PagePreview);
CMS.registerPreviewTemplate('posts', PostPreview);

if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', (user) => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}
