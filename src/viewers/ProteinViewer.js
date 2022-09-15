import { useRef, useEffect, React } from 'react';

import StructureRenderer from '../three_js/renderers/structure_renderer';

let structureRenderer;

const ProteinViewer = (props) => {
  const contentRef = useRef();
  const { className, data, isAutoRotating } = props;

  useEffect(() => {
    if (data !== null && contentRef.current) {
      if (contentRef.current.innerHTML === '') {
        structureRenderer = new StructureRenderer(
          data,
          contentRef.current,
          isAutoRotating
        );
        return;
      }

      if (isAutoRotating === true) {
        structureRenderer.startAutoRotation();
      } else {
        structureRenderer.stopAutoRotation();
      }

      // TODO: Find a better way to handle the delta here -
      // This is needed to prevent Three leaking contexts.
      const newRawPdbData = JSON.stringify(data.json).trim();
      const existingRawPdbData = JSON.stringify(
        structureRenderer.pdbData.json
      ).trim();

      if (newRawPdbData !== existingRawPdbData) {
        structureRenderer.destroy();
        structureRenderer = new StructureRenderer(
          data,
          contentRef.current,
          isAutoRotating
        );
      }
    }
  }, [data, isAutoRotating]);

  return <div className={className} ref={contentRef} />;
};

export default ProteinViewer;
