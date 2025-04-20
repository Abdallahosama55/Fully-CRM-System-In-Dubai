export default function WidgetTest() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe id="myIframe"
        width="80px" height="80px"
          src="${import.meta.env.VITE_BASE_WIDGET}/?hash=aaa112"
          title="Vindo CRM" frameborder="0" allow="accelerometer;
          clipboard-write; encrypted-media; gyroscope; picture-in-picture;
          web-share" allowfullscreen style="position:fixed; bottom: 0px; right: 0px; z-index: 1;" />
          <script>
          var iframe = document.getElementById('myIframe');
          function openIframeStyle() {
              iframe.style.width = '320px';
              iframe.style.height = '530px';
          }
          function closeIframeStyle() {
              iframe.style.width = '80px';
              iframe.style.height = '80px';
          }
          window.addEventListener('message', function(event) {
              if (event.data === 'openIframeStyle') {
                  openIframeStyle();
              }
              if (event.data === 'closeIframeStyle') {
                setTimeout(()=>{
                    closeIframeStyle();
                }, "100")
              }
          });
          </script>
          `,
      }}></div>
  );
}
