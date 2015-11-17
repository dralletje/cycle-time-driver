# Cycle time driver

A timer that lets you interact with time, because even though rxjs
acts like it's part of their API, it's actually impure! With this, it
becomes predictable again, if you want. Of course normally you want
your application to run in the current time, but when testing it is
useful to 'mock the time', so your application actually runs in the future
or history! :o
