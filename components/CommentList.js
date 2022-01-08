import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <ul className="p-8 flex flex-col font-ibm gap-2">
      <Comment key={1} />
      <Comment key={2} />
      <Comment key={3} />
      <Comment key={4} />
      <Comment key={5} />
      <Comment key={6} />
      <Comment key={7} />
      <Comment key={8} />
    </ul>
  );
}
