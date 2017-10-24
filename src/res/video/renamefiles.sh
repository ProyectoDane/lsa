for i in *mp4; do
  mv "$i" "$(echo "$i" | tr [:upper:] [:lower:] | sed 's/^[0-9]*\W*//' | sed 's/^ - //' | sed 's/_/-/g' | sed 's/ñ/n/g')";
done
